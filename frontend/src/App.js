import React, { useState } from 'react';
import Select from 'react-select';
import './App.css';

const countryOptions = [
   "Algeria", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Belarus", "Belgium", "Botswana", "Brazil", "Bulgaria",
  "Burkina Faso", "Burundi", "Cameroon", "Canada", "Central African Republic", "Chile", "Colombia",
  "Croatia", "Denmark", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Eritrea",
  "Estonia", "Finland", "France", "Germany", "Ghana", "Greece", "Guatemala", "Guinea", "Guyana",
  "Haiti", "Honduras", "Hungary", "India", "Indonesia", "Iraq", "Ireland", "Italy", "Jamaica",
  "Japan", "Kazakhstan", "Kenya", "Latvia", "Lebanon", "Lesotho", "Libya", "Lithuania",
  "Madagascar", "Malawi", "Malaysia", "Mali", "Mauritania", "Mauritius", "Mexico", "Montenegro",
  "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
  "Norway", "Pakistan", "Papua New Guinea", "Peru", "Poland", "Portugal", "Qatar", "Romania",
  "Rwanda", "Saudi Arabia", "Senegal", "Slovenia", "South Africa", "Spain", "Sri Lanka", "Sudan",
  "Suriname", "Sweden", "Switzerland", "Tajikistan", "Thailand", "Tunisia", "Turkey", "Uganda",
  "Ukraine", "United Kingdom", "Uruguay", "Zambia", "Zimbabwe"
].map(country => ({ value: country, label: country }));

const cropOptions = [
  'Maize', 'Potatoes', 'Rice (paddy)', 'Sorghum', 'Soybeans',
  'Wheat', 'Cassava', 'Sweet potatoes', 'Plantains and others', 'Yams',
];

const cropDescriptions = {
  'Maize': 'Maize is a staple food in many regions and widely grown in tropical climates.',
  'Potatoes': 'Potatoes are a root vegetable and a staple food in many countries.',
  'Rice (paddy)': 'Rice is a primary food source, especially in Asian countries.',
  'Sorghum': 'Sorghum is drought-tolerant and commonly used in arid regions.',
  'Soybeans': 'Soybeans are used for oil, protein, and livestock feed.',
  'Wheat': 'Wheat is a major cereal grain grown worldwide.',
  'Cassava': 'Cassava is a root crop known for its high starch content.',
  'Sweet potatoes': 'Sweet potatoes are nutrient-rich and grown in tropical regions.',
  'Plantains and others': 'Plantains are starchy fruits cooked before eating.',
  'Yams': 'Yams are tuber crops and important for food security in Africa.',
};

const cropImages = {
  'Maize': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnUkKbUlkA6Ioz9BgNvehEvCE4NoX1me1Lqg&s',
  'Potatoes': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSslf5WnZhy6gKoF5K8eigxQOr4bsOvVEaBNA&s',
  'Rice (paddy)': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4pyIAc7-jqAQKOwudn7rYvqKoLvBz26uGZA&s',
  'Sorghum': 'https://i0.wp.com/www.smartfood.org/wp-content/uploads/2017/02/sorghum.jpg?fit=690%2C439&ssl=1',
  'Soybeans': 'https://www.iita.org/wp-content/uploads/2018/04/soybean-iitacrop.jpg',
  'Wheat': 'https://www.world-grain.com/ext/resources/2023/07/28/wheat-ears-field_NITR---STOCK.ADOBE.COM_e.jpg?height=635&t=1740666388&width=1200',
  'Cassava': 'https://blog.naijaspider.com/wp-content/uploads/2024/10/Cassave.webp',
  'Sweet potatoes': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXIu1_e3-c4Fr6dbwuJwqVtryqY-NU-Gl1Q&s',
  'Plantains and others': 'https://cdn.britannica.com/58/194358-050-91CE9CB6/Gros-Michel-banana-tree.jpg',
  'Yams': 'https://media.istockphoto.com/id/1344941660/photo/different-grade-of-sweet-potato-growing-white-and-purple-sweet-potato.jpg?s=612x612&w=0&k=20&c=Sp8Q8ygjcqgvrY_TqzrPXDV9l3nR6qK-bVm6CbecOzk=',
};

function App() {
  const [formData, setFormData] = useState({
    area: '',
    item: '',
    years: '',
    rainfall: '',
    pesticide: '',
    temperature: '',
  });

  const [predictedYield, setPredictedYield] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selected, name) => {
    setFormData((prev) => ({ ...prev, [name]: selected?.value || '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://backendcyp.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          area: formData.area,
          item: formData.item,
          rainfall: parseFloat(formData.rainfall),
          pesticide: parseFloat(formData.pesticide),
          temperature: parseFloat(formData.temperature),
        }),
      });
      const data = await res.json();
      const years = parseFloat(formData.years);
      const totalYield = data.yield * (isNaN(years) ? 1 : years);
      setPredictedYield(totalYield.toFixed(2));
    } catch (err) {
      alert("Error fetching yield. Please try again.");
    }
  };

  const { area, item } = formData;

  return (
    <div>
      <center style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", margin: "0px", height: "40px" }}>
        <h2>🌾 Crop Yield Predictor</h2>
      </center>
      <div className="predictor-container">
        <div className="top-section">
          <div className="form-box">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <Select
                  options={countryOptions}
                  placeholder="Select Area"
                  onChange={(selected) => handleSelectChange(selected, 'area')}
                  required
                />
              </div>
              <div className="form-group">
                <select
                  name="item"
                  value={item}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Crop</option>
                  {cropOptions.map((crop) => (
                    <option key={crop} value={crop}>
                      {crop}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="number"
                name="years"
                placeholder="Years *"
                value={formData.years}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="rainfall"
                placeholder="Rainfall (mm) *"
                value={formData.rainfall}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="pesticide"
                placeholder="Pesticide (Tonnes) *"
                value={formData.pesticide}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="temperature"
                placeholder="Temperature (°C) *"
                value={formData.temperature}
                onChange={handleChange}
                required
              />
              <button type="submit">Get Yield</button>
            </form>
          </div>

          <div className="output-box">
            <h2>🌿 Predicted Yield</h2>
            {item && area && predictedYield !== null ? (
              <>
                <h3 style={{ fontFamily: "Roboto", fontWeight: "Light" }}>{item} in {area}</h3>
                <center>
                  <p style={{ fontFamily: "Roboto", fontWeight: "bold" }}>
                    Total Yield for {formData.years} year{formData.years > 1 ? 's' : ''}: {predictedYield} tonnes
                  </p>
                </center>
                <img
                  style={{ backgroundSize: "cover" }}
                  src={cropImages[item]}
                  alt={item}
                  className="crop-img"
                />
                <p>{cropDescriptions[item]}</p>
              </>
            ) : (
              <p>Please select a crop and area to view prediction.</p>
            )}
          </div>
        </div>

        <div className="contact-section">
          <h3>📞 Contact Us</h3>
          <p><strong>☎️</strong> <a href="tel:9346789906">9346789906</a></p>
          <p><strong>ⓕ</strong> <a href="https://www.facebook.com/bunny.styles.940/" target="_blank" rel="noreferrer">Chaithanya</a></p>
          <p><strong>🅾</strong> <a href="https://instagram.com/mr_mystery4040" target="_blank" rel="noreferrer">Chaithu</a></p>
          <div className="copyright">
                 © 2025 Chaithanya. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

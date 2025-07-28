import React, { useState, useEffect } from "react";

function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDogImage = () => {
    setLoading(true);
    setError(null);

    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setImageUrl(data.message);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load image.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDogImage();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={imageUrl}
        alt="A Random Dog"
        style={{ maxWidth: "90%", height: "auto", borderRadius: "8px" }}
      />
      <br />
      <button onClick={fetchDogImage} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
        Show Another Dog
      </button>
    </div>
  );
}

export default App;

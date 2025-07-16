const vision = require("@google-cloud/vision");
const pool = require("../db/pool");

const client = new vision.ImageAnnotatorClient({
  keyFilename: "./key.json",
});

exports.searchByImage = async (req, res) => {
  try {
    const [result] = await client.labelDetection({ image: { content: req.file.buffer } });
    const labels = result.labelAnnotations.map((label) => label.description.toLowerCase());

    const query = `
      SELECT * FROM products
      WHERE EXISTS (
        SELECT 1 FROM unnest(keywords) AS kw
        WHERE LOWER(kw) = ANY($1)
      )
    `;
    const { rows } = await pool.query(query, [labels]);

    res.json({ products: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Không nhận diện được ảnh" });
  }
};

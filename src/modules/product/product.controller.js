import ProductModel from "./product.module.js";

class ProductController {
  static async createProduct(req, res) {
    try {
      const { dataCategory, recordCount, fields } = req.body;

      if (!dataCategory || !recordCount || !fields) {
        return res.status(400).json({
          error: "Data category, record count, and fields are required",
        });
      }

      const product = await ProductModel.create({
        dataCategory,
        recordCount,
        fields,
      });

      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({
        error: "Error creating product",
        details: error.message,
      });
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await ProductModel.findAll();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({
        error: "Error fetching products"
      });
    }
  }

  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductModel.findById(id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({
        error: "Error fetching product"
      });
    }
  }
}

export default ProductController;

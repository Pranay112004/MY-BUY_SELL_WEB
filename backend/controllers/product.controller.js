
import mongoose from "mongoose";
import Product from "../models/product.js";

export const getProducts = async (req,res )=>{
    try{
        const products = await Product.find();
        res.status(200).json({ success : true , data: products});
    } catch (error){
        console.log("error in fetching products:",error.message);
        res.status(500).json({success:false,message:"server error"});
    }
}


export const createProduct = async (req, res) => {
    const product = req.body; // user will send this data
    
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ success:false , message:"Please provide all fields "});
    }

    const newProduct = new Product(product)

    try{
        await newProduct.save();
        res.status(201).json({ success: true , data: newProduct});
    } catch(error){
        console.error("Error in CREATE Product:",error.message);
        res.status(500).json({ success: false , message: "Server Error"});
    }
    
};

export const updateProduct =  async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid Product Id",
        });
    }

    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: id },
            product,
            { new: true } // return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            data: updatedProduct,
        });

    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const deleteProduct = async (req,res)=>{
    const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid Product Id",
        });
    } 
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Deleted "});
        
    } catch(error){
        console.log("Error in Deleting Product:",error.message); 
        res.status(500).json({ success: false , message: "Server Error!"});
    }
}

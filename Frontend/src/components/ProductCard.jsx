import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => (
  <motion.div whileHover={{ scale: 1.05 }} className="w-full sm:w-1/2 md:w-1/3 p-2">
    <Card className="rounded-2xl shadow-md">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-t-2xl" />
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-green-600 font-bold mb-2">{product.price.toLocaleString()} VND</p>
        <Button className="w-full">Mua ngay</Button>
      </CardContent>
    </Card>
  </motion.div>
);

export default ProductCard;

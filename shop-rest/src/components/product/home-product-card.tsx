import dynamic from "next/dynamic";

const Neon2 = dynamic(() => import("@components/product/product-card/neon2")); // grocery-two

export default function renderProductCard(product: any, className = "") {
  
    return <Neon2 product={product} className={className} />;
}

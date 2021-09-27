import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useEffect ,Fragment,useState , useRef,useCallback} from "react";
import { useCreateProductMutation } from "@data/master-products/master-product-create.mutation";

export default function Product({product,shopId,masterIds}:any) {
    const { mutate: createProduct, isLoading: creating } = useCreateProductMutation();
    const [alreayMade,setAlreadyMade]=useState(false);

    useEffect(()=>{
        if(masterIds.includes(product.id)){
            setAlreadyMade(true);
        }
    })
    function addProduct():any{
        console.log(product.id);
        const price = document.getElementById("price_"+product.id)?.value as any;
        const sale_price = document.getElementById("sale_price_"+product.id)?.value as any;
        const quantity = document.getElementById("quantity_"+product.id)?.value as any;
        if(price&&sale_price){
            createProduct(
                {
                    shop_id:shopId,
                    price:price,
                    master_id:product.id,
                    quantity:quantity,
                    sale_price:sale_price,
                },
                {
                    onSuccess:()=>{
                        setAlreadyMade(true);
                    },
                    onError: (error: any) => {
                        console.log(error);
                    },
                }
            );
        }
    }

    if(alreayMade){
        return ("");
    }
    return (
        <>          
            <tr data-row-key="542" className="rc-table-row rc-table-row-level-0 h-24 `text-center`">
                <td className="rc-table-cell text-center">
                    <div style={{boxSizing: "border-box", display: "inline-block", position: "relative", width: "60px", height: "auto"}}>
                        <img alt={product.name} src={product?.image?.original ?product?.image?.original:''} decoding="async" className="rounded overflow-hidden"/>
                    </div>
                </td>
                <td title="cosmos" className="rc-table-cell rc-table-cell-ellipsis text-center">{product.name}</td>
                
                <td className="rc-table-cell text-center" >
                    <span className="whitespace-nowrap" title={"$"+product.price}>
                    <Input
                        name="price"
                        variant="outline"
                        className="mb-5"
                        placeholder="price"
                        id={"price_"+product.id}
                    />
                    </span>
                </td>
                <td className="rc-table-cell text-center" >
                    <Input
                        name="sale_price"
                        variant="outline"
                        placeholder="sale price"
                        className="mb-5"
                        id={"sale_price_"+product.id}
                    />
                </td>
                <td className="rc-table-cell text-center" >
                    <span className="whitespace-nowrap" title={"$"+product.quantity}>
                    <Input
                        name="quantity"
                        variant="outline"
                        className="mb-5"
                        placeholder="quantity"
                        id={"quantity_"+product.id}
                    />
                    </span>
                </td>
                <td className="rc-table-cell text-center" >
                    <div className="space-s-5 inline-flex items-center w-auto">
                        <Button
                            variant="outline"
                            onClick={addProduct}
                            className="mr-4"
                            type="button"
                        >
                            Add
                        </Button>
                    </div>
                </td>
            </tr>
        </>
    );
}


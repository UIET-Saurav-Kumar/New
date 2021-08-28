import { useProductsQuery } from "@data/master-products/products.query";
import { useProductQuery } from "@data/master-products/master-product.query"
import ErrorMessage from "@components/ui/error-message"
import NotFound from "@components/common/not-found";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useEffect ,Fragment,useState , useRef,useCallback} from "react";
import useIntersectionObserver from "./useIntersectionObserver";
import Product from './product';
import Checkbox from "@components/ui/checkbox/checkbox";
import { PriceWalletIcon } from "@components/icons/shops/price-wallet";


export type FeedType ={
  shopId:string,
  searchTerm:string,
  type:string,
  category:string,
  orderBy:string,
  sortedBy:any,
}
export default function ProductsFeed({shopId,searchTerm,type,category,orderBy,sortedBy}:FeedType) {
  const [page, setPage] = useState(1);
  const [masterProduct,setMasterProduct]=useState([])

  const {
    data:master,
  } = useProductQuery(shopId as string);
  const {
    data,
    isFetchingNextPage,
    isFetching: loading,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
  } = useProductsQuery(
    {
      text: searchTerm,
      limit: 10,
      shop_id: Number(shopId),
      type,
      category,
      orderBy,
      sortedBy,
      page,
    },
    {
      enabled: Boolean(shopId),
    }
  );
  useEffect(()=>{
    console.log(master,'master');
    
  },[])
  function addProduct(id:number):any{
    const price = document.getElementById("pirce_"+id)?.nodeValue;
    const quantity = document.getElementById("quantity_"+id)?.nodeValue;
    console.log(price,quantity)
    if(!(price&&quantity)){
      return ;
    }
    console.log(price,quantity);
    console.log(id);
  }
  function handleLoadMore() {    
    console.log("handleLoadMore");
    fetchNextPage();
  }
  const loadMoreRef = useRef()

  useIntersectionObserver({
        target: loadMoreRef,
        onIntersect: fetchNextPage,
        enabled: hasNextPage,
  })
  if (isError && error) return <ErrorMessage message={error.message} />;

  // if (!loading && !data?.pages?.length) {
  //   return (
  //     <div className="bg-gray-100 pt-6 pb-8 px-4 lg:p-8">
  //       <NotFound text="text-not-found" className="w-7/12 mx-auto" />
  //     </div>
  //   );
  // }

  return (
    <>
    <table >
      <thead className="rc-table-thead">
          <tr>
              <th className="rc-table-cell w-48 min-w-full" >Image</th>
              <th title="Name" className="rc-table-cell rc-table-cell-ellipsis w-48 min-w-full" >Name</th>
              <th className="rc-table-cell w-48 min-w-full" >Price</th>
              <th className="rc-table-cell w-48 min-w-full" >Sale Price</th>
              <th className="rc-table-cell w-48 min-w-full" >Actions</th>
          </tr>
      </thead>
      <tbody className="rc-table-tbody">
      {data?.pages.map((products, _idx) => (
          <Fragment key={_idx}>
            {products.products?.data?.map((product:any,id:any) => (
              <Product product={product} shopId={shopId} key={id} masterIds={master} className={`${master.includes(product.id)}:"hidden":""`}/>
            ))}
          </Fragment>
        ))}
      
      </tbody>
    </table>
      
      <div ref={loadMoreRef} className={`${!hasNextPage ? "hidden" : ""}`}>
              {isFetchingNextPage ? "Loading more..." : ""}
      </div>
    </>
  );
}

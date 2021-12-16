
import router, { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import SidebarMenu from "@components/ui/sidebar-menu";
import Scrollbar from "@components/ui/scrollbar";
import CategoryListLoader from "@components/ui/loaders/category-loader";
import NotFound from "@components/common/not-found";
import { useCategoriesQuery } from "@data/category/use-categories.query";

const CategoryDropdownSidebar = () => {
  const { query } = useRouter();
  const { type } = query;

 

  const {
    data,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    type: query.slug as string,
  });

  function allCategories() {

   
   
    const { pathname , query } = router;
    
    const navigate = () =>
      router.push(
        {
          pathname,
          query: { ...query, category: null },
        },
        undefined,
        {
          scroll: false,
        }
      );

    if (Array.isArray(data?.categories?.data) && !!data?.categories?.data.length) {
      navigate();
    } else {
      navigate();
      
    }
  }
  


  if (loading) {
    return (
      <div className=" hidden lg:block">
        <div className="w-60 mt-8 px-2">
            <CategoryListLoader />
        </div>
      </div>
    );
  }

  console.log('category data', data)

  if (error) return <ErrorMessage message={error.message} />;

  
  return (
    <>
    {/* web */}
    <aside className="hidden lg:block md:sticky w-96 top-22 h-full lg:w-96   bg-light">
      <div className="max-h-full overflow-hidden">

        <Scrollbar className="w-full h-full max-h-screen">
          {data?.categories?.data?.length ? (
            <div className="px-5 h-96">
              <SidebarMenu items={data?.categories?.data} 
              className="py-8" />
            </div>
          ) : (
            <div className="min-h-full pt-6 pb-8 px-9 lg:p-8">
            </div>
          )}
        </Scrollbar>
      </div>
    </aside>

    {/* Mobile */}
    <div className='lg:hidden relative flex'> 
    {/* <div className='flex  h-screen top-14 sticky flex-col w-20'>    */}
      <div className=" h-screen top-0 sticky  flex-col  flex  overflow-y-scroll justify-between  space-y-8 text-center">

        <Scrollbar className="w-full h-full max-h-screen">
      
          {data?.categories?.data?.length ? (
            <div className="px-5 h-96">
              <button onClick={allCategories} className={` ${query.category == ''  ? 'text-magenta' : 'text-gray-600'} text-sm focus:text-magenta font-semibold `}>
              <img src='/categories.png' className='w-10 tracking-widest  h-10 ' /> ALL
              </button>
              <SidebarMenu items={data?.categories?.data} className="whitespace-nowrap  py-8" />
            </div>
          ) : (
            <div className="min-h-full pt-6 pb-8 px-9 lg:p-8">
            </div>
          )}   
        </Scrollbar>
      </div>
    </div>
      {/* </div> */}
    </>

    
    
  );
};

export default CategoryDropdownSidebar;



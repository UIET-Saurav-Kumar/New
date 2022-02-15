
import router, { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import SidebarMenu from "@components/ui/sidebar-menu";
import Scrollbar from "@components/ui/scrollbar";
import CategoryListLoader from "@components/ui/loaders/category-loader";
import NotFound from "@components/common/not-found";
import { useCategoriesQuery } from "@data/category/use-categories.query";
import CategorySlider from "./category-slider";


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
          // pathname,
          query: { ...query, category: null, text: null },
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
  // const { slug, name, children: items, icon } = item;

  if (error) return <ErrorMessage message={error.message} />;

  
  return (
    <>
    {/* web */}
    
    <aside className="hidden lg:block items-center justify-center h-full   bg-light">
      <div className="max-h-full flex max-w-full ">
      <button onClick={allCategories} className={` ${query.category == ''  ? 'text-magenta' : 'text-gray-600'} text-sm sticky bg-white  ml-0 lg:px-4 top-0 z-40 focus:text-magenta justify-center  flex flex-col font-semibold `}>
              <img src='/categories.png' className='  w-2 h-2 lg:w-6 tracking-widest lg:h-6 mr-2'/> ALL
              </button>
        {/* <Scrollbar className="w-full h-full max-h-screen"> */}
        {data?.categories?.data?.length ? (
            <div className=" flex lg:overflow-x-scroll relative justify-evenly w-full">
              <CategorySlider items={data?.categories?.data} />
              {/* <SidebarMenu items={data?.categories?.data} className="whitespace-nowrap overflow-x-scroll sticky py-2" /> */}
            </div>
          ) : (
            ' '
          )}   
        {/* </Scrollbar> */}
      </div>
    </aside>


    {/* Mobile */}
    <div className='lg:hidden w-20 sm:w-full  relative flex'> 
    {/* <div className='flex  h-screen top-14 sticky flex-col w-20'>    */}
      <div className=" h-screen top-0 sticky flex-col flex overflow-y-scroll justify-between  space-y-8 text-center">
        <Scrollbar className="w-full h-full max-h-screen">
      
          {data?.categories?.data?.length ? (
            <div className="">
              <button onClick={allCategories} className={` ${query.category == ''  ? 'text-magenta' : 'text-gray-600'} text-sm focus:text-magenta font-semibold `}>
              <img src='/categories.png' className='w-8 tracking-widest  h-8 ' /> ALL
              </button>
              <SidebarMenu items={data?.categories?.data} className="whitespace-nowrap  py-8" />
            </div>
          ) : (
            ''
            // <div className="min-h-full pt-6 pb-8 px-9 lg:p-8">
            // </div>
          )}   
        </Scrollbar>
      </div>
    </div>
      {/* </div> */}
    </>


  );
};

export default CategoryDropdownSidebar;



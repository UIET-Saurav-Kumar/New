
import router, { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import SidebarMenu from "@components/ui/sidebar-menu";
import Scrollbar from "@components/ui/scrollbar";
import CategoryListLoader from "@components/ui/loaders/category-loader";
import NotFound from "@components/common/not-found";
import { useCategoriesQuery } from "@data/category/use-categories.query";
import CategorySlider from "./category-slider";
import { useWindowDimensions } from "@components/common/search";
import { useEffect, useState } from "react";

// export async function getStaticProps() {
//   const posts = await getPosts()
//   return { props: { posts } }
// }

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://api.github.com/users/xiaotian/repos')
  const category = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      category,
    },
  }
}

const CategoryDropdownSidebar = ({data,category}:any) => {

  const { query } = useRouter();
  const { type } = query;

  console.log('category',category)

  const {
    data :categoryData,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    type: query.slug as string,
  });


  // console.log('categoryData', categoryData);

  const { height, width } = useWindowDimensions();

  const [pageURL, setPageUrl] = useState('');

  const slug = ['chandigarh-grocery-store', 'kosmetics-india'];


  function allCategories() {

    const { pathname , query } = router;

    const navigate = () =>
    
      { width < 976 ?
        ( slug?.some(el => pageURL.includes(el)) ?  window.scrollTo(0, 150) : 
        window.scrollTo(0, 620) ) : 
        ( slug?.some(el => pageURL.includes(el)) ?  window.scrollTo(0, 570) :
        window.scrollTo(0, 550) )
      };

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

    if (Array.isArray(categoryData?.categories?.data) && !!categoryData?.categories?.data.length) {
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

  function onClick(item:any) {

    console.log('query cat',item)
   
    const { pathname, query } = router;
    router.push(
      {
        pathname,
        query: { ...query, category: item?.slug , text: null || null },
        
      },
     
      undefined,
      {
        scroll: false,
      }
    );
  }

  // console.log('shop slug name', data?.slug)
  // const { slug, name, children: items, icon } = item;

  if (error) return <ErrorMessage message={error.message} />;

  
  return (

    <>
    {/* web */}
    
    <aside className="hidden lg:block items-center justify-center h-full bg-light">
      <div className="max-h-full flex max-w-full">
        {categoryData?.categories?.data?.length ? ( <button onClick={allCategories} className={` ${query.category == ''  ? 'text-magenta' : 'text-gray-600'} text-sm sticky bg-white  ml-0 lg:px-4 top-0 z-40 focus:text-magenta justify-center  flex flex-col font-semibold `}>
                  <img 
                  src='/categories.png'
                  // src='/categories.png'
                  className='  w-2 h-2 lg:w-6 tracking-widest lg:h-6 mr-2'/> ALL
          </button> ) : (
              ' '
            )}  
          {/* <Scrollbar className="w-full h-full max-h-screen"> */}
          {categoryData?.categories?.data?.length ? (
              <div className=" flex lg:overflow-x-scroll scrollbar-hide relative justify-evenly w-full">
                <CategorySlider items={categoryData?.categories?.data} />
                {/* <SidebarMenu items={data?.categories?.data} className="whitespace-nowrap overflow-x-scroll sticky py-2" /> */}
              </div>
            ) : (
              ' '
            )}   
          {/* </Scrollbar> */}
      </div>
    </aside>


    {/* Mobile */}
   { data?.slug !== 'kosmetics-india' ? <> 

   <div className='lg:hidden w-16 sm:w-full relative flex'> 
    {/* <div className='flex  h-screen top-14 sticky flex-col w-20'>    */}
      <div className=" h-screen top-0 sticky flex-col flex overflow-y-scroll scrollbar-hide justify-between  space-y-8 text-center">
        {/* <Scrollbar className="w-full h-full max-h-screen"> */}
      
          {categoryData?.categories?.data?.length ? (

            <div className="text-center  w-full">
              <button onClick = {allCategories} className={` ${query.category == ''  ? 'text-magenta' : 'text-gray-600'} text-sm focus:text-magenta font-semibold `}>
                <img
                src='/categories.png'
                //  src='/grocery-all.png' 
                className='w-5 tracking-widest h-5 object-contain' /> ALL
              </button>
              
              <SidebarMenu items={categoryData?.categories?.data} 
                           className="" />
            </div>
          ) : (
            ''
            // <div className="min-h-full pt-6 pb-8 px-9 lg:p-8">
            // </div>
          )}   
        {/* </Scrollbar> */}
      </div>
    </div> </> :

    

        <aside className="lg:hidden flex items-center justify-center h-full   bg-light">
            <div className="max-h-full flex max-w-full">
                <button onClick={allCategories} className={` ${query.category == ''  ? 'text-magenta' : 'text-gray-600'} text-sm sticky bg-white  ml-0 lg:px-4 top-0 z-30 focus:text-magenta justify-center  flex flex-col font-semibold `}>
                        <img 
                        src='/categories.png'
                        // src='/categories.png'
                        className='  w-2 h-2 lg:w-6 tracking-widest lg:h-6 mr-2'/> ALL
                </button>
                {/* <Scrollbar className="w-full h-full max-h-screen"> */}
                {categoryData?.categories?.data?.length ? (
                  <div className=" flex overflow-x-scroll relative justify-evenly w-full">
                    <CategorySlider items={categoryData?.categories?.data} />
                    {/* <SidebarMenu items={data?.categories?.data} className="whitespace-nowrap overflow-x-scroll sticky py-2" /> */}
                  </div>
                ) : (
                  ' '
                )}   
              {/* </Scrollbar> */}
            </div>
        </aside>

}
      {/* </div> */}
    </>


  );
};

export default CategoryDropdownSidebar;



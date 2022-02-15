import SearchBox from "@components/ui/search-box";
import { useSearch } from "@contexts/search.context";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface Props {
  label: string;
  [key: string]: unknown;
}

const Search: React.FC<Props> = ({ label, ...props }) => {

  const { t } = useTranslation();
  const router = useRouter();
  const { searchTerm, updateSearchTerm } = useSearch();
  
  const handleOnChange = (e: any) => {
    const { value } = e.target;
    updateSearchTerm(value);
  };

  //allow suggestions while typing
  const handleOnKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      router.push(`/search?q=${searchTerm}`);
    }
  };


  const onSearch = (e: any) => {
    
    e.preventDefault();
    if (!searchTerm) return;
    const { pathname, query } = router;
    const { type, ...rest } = query;
    //scroll down to product feed on lg screens
    if (type === "shop") {
      window.scrollTo({
        top: document.querySelector(".product-feed")?.offsetTop,
        behavior: "smooth",
      });
    }

    window.scrollTo(0, 1110);

    router.push(
      {
        // pathname,
        query: { ...rest, text: searchTerm, category: undefined },
      },
      {
        pathname: type ? `/${type}` : '',
        query: { ...rest, text: searchTerm },
      },
      {
        scroll: false,
      }
    );
  };

  function clearSearch() {

    updateSearchTerm("");
    
    
    const { pathname, query } = router;
    const { type, text, ...rest } = query;
    // scroll down to product feed
    // window.scrollTo(0, 1000);

    // window.scrollTo(1000, 0);

    console.log('pathname',pathname);
    console.log('query',query);

    if (text) {
      query.category == null ?  window.scrollTo(0, 1000) : window.scrollTo(0, 1110);
      router.push(
        {
          query: { ...rest, category: null },
          
         },
       


        {
          // pathname: type ? `/${type}` : pathname,
          query: { ...rest },
       
        },
        {
          scroll: false,
        }
      );
    }
  }

  return (

    <SearchBox
      label={label}
      onSubmit={onSearch}
      onClearSearch={clearSearch}
      onChange={handleOnChange}
      value={searchTerm}
      name="search"
      placeholder={'Search Products'}
      {...props}
    />

  );
};

export default Search;

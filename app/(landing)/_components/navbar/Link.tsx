import { SelectedPage } from '@/lib/types';
import React from 'react';
import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
    page:string;
    selectedPage:SelectedPage;
    setSelectedPage:(value:SelectedPage) => void;
}

function Link({page, selectedPage, setSelectedPage}: Props) {
  
    const lowerCasePage = page.toLowerCase().replace(/ /g, "") as SelectedPage;

    return (
   <AnchorLink className={`${selectedPage===lowerCasePage ? 
   "text-hotpink": "" } 
   transition duration-500 hover:text-darkpurple` }
   href={`#${lowerCasePage}`}
   onClick = {()=> setSelectedPage(lowerCasePage)}>
    
        {page}

   </AnchorLink>
  )
}

export default Link
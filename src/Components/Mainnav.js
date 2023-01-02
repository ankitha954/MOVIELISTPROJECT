import React, { useEffect ,useState } from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TvIcon from '@mui/icons-material/Tv';
import MovieIcon from '@mui/icons-material/Movie';
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from "react-router-dom";
import './Mainnav.css'



 
export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (value === 0) {
      history.push("/");
    } else if (value === 1) {
      history.push("/movies");
    } else if (value === 2) {
      history.push("/series");
    } else if (value === 3) {
      history.push("/search");
    }
  }, [value, history]);

    return (
      <BottomNavigation className="root"
        value={value}
        onChange={(event,newValue) => {
          setValue(newValue);
        }}
        style={{fontSize:"15px"}}
        showLabels 
      >
        <BottomNavigationAction 
          style={{ color: "black"}}
          label="Trending"
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction 
          style={{ color: "black" }}
          label="Movies"
          icon={<MovieIcon />}
        />
        <BottomNavigationAction 
          style={{ color: "black" }}
          label="TV Series"
          icon={<TvIcon />}
        />
        <BottomNavigationAction
          style={{ color: "black" }}
          label="Search"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
     
    );
  }

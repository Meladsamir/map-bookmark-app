import React, { useRef, useEffect, useState } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import MapWidgets from './MapWidgets';
import Graphics from './Graphics';
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import { addBookmark ,getBookmarks} from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebase/firebase'
const MapComponent = () => {
  const mapRef = useRef(null);
  const [view, setView] = useState(null);
  const [user] = useAuthState(auth);

const [bookmarks, setBookmarks]=useState([])
  const glSearchResult = new GraphicsLayer({
    id: 'glSearchResult',
  });

  useEffect( async() => {
  
      getBookmarks(user.email).then(()=> setBookmarks(res))
     
     
   new MapView({
      container: mapRef.current,
      map: new Map({
        basemap: 'dark-gray',
        layers: [glSearchResult],
      }),
      zoom: 3,
    }).when((view) => {
      setView(view)
      const BookmarksV= new Bookmarks({
        view: view,
        editingEnabled: true,
         bookmarks:bookmarks
      })
      view.ui.add(BookmarksV ,'top-right');
      BookmarksV.bookmarks.on("change", function(e){
        let w= JSON.parse(JSON.stringify(BookmarksV.bookmarks.items))   
         console.log(w)      
        })
        BookmarksV.on("bookmark-edit", function({bookmark}){
          addBookmark(JSON.parse(JSON.stringify(bookmark)),user.email)
          console.log(bookmark)      
        })
    });
  }, [addBookmark]);
  console.log(view)

  return (
    <div ref={mapRef} style={{ height: '100vh', width: '100%' }}>
      {view && (
        <>
          {/* <MapWidgets view={view} bookmarks={bookmarks} /> */}
          <Graphics view={view} />
        </>
      )}
    </div>
  );
};

export default MapComponent;

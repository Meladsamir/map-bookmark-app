import React, { useRef, useEffect, useState } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import MapWidgets from './MapWidgets';
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import { addBookmark, getBookmarks,removeBookmark } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebase/firebase'
const MapComponent = () => {
  const mapRef = useRef(null);
  const [view, setView] = useState(null);
  const [user] = useAuthState(auth);

  const [bookmarks, setBookmarks] = useState(null)
  const glSearchResult = new GraphicsLayer({
    id: 'glSearchResult',
  });

  useEffect(async () => {
    if (bookmarks === null) {
      getBookmarks(user.email).then((res) => setBookmarks(res))
    }

    new MapView({
      container: mapRef.current,
      map: new Map({
        basemap: 'dark-gray',
        layers: [glSearchResult],
      }),
      zoom: 3,
    }).when((view) => {
      setView(view)
      const BookmarksV = new Bookmarks({
        view: view,
        editingEnabled: true,
        bookmarks: bookmarks
      })
      view.ui.add(BookmarksV, 'top-right');
      view.when(() => {
        BookmarksV.bookmarks.on('change', ({ added, removed }) => {
          
          const addedBookmarkJson = added.map(x => x.toJSON());
          const removedBookmarkJson = removed.map(x => x.toJSON());

          if (addedBookmarkJson.length > 0) {
            addBookmark(user.email, addedBookmarkJson[0]).then(() => alert('added successfully'))
          } else if (removedBookmarkJson.length > 0) {
            removeBookmark(user.email, removedBookmarkJson[0].name).then(() => alert('bookmark Removed'))

          }
        });
      });

        BookmarksV.on("bookmark-edit", function(bookmark){
         alert("edit bookmark name still under development, so your changes will not save")
        })
    });
  }, [bookmarks, setBookmarks, addBookmark]);
  console.log(view)

  return (
    <div ref={mapRef} style={{ height: '91vh', width: '100%' }}>
      {view && (
        <>
          <MapWidgets view={view} bookmarks={bookmarks} />
        </>
      )}
    </div>
  );
};

export default MapComponent;

import { useEffect } from 'react';
import Home from '@arcgis/core/widgets/Home';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';
import Bookmarks from '@arcgis/core/widgets/Bookmarks';

const MapWidgets = ({ view,bookmarks }) => {
  useEffect(() => {
    view.ui.add(
      new Home({
        view: view,
      }),
      'top-left'
    );
   const BookmarksV= new Bookmarks({
      view: view,
      editingEnabled: true,
       bookmarks:bookmarks
    })
    // view.ui.add(
    //   new BasemapToggle({
    //     view: view,
    //     nextBasemap: 'topo',
    //   }),
    //   'bottom-left'
    // );
          view.ui.add(BookmarksV ,'top-right');

  }, []);

  return null;
};

export default MapWidgets;

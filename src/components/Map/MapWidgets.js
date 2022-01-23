import { useEffect } from 'react';
import Home from '@arcgis/core/widgets/Home';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';

const MapWidgets = ({ view,bookmarks }) => {
  useEffect(() => {
    view.ui.add(
      new Home({
        view: view,
      }),
      'top-left'
    );
    view.ui.add(
      new BasemapToggle({
        view: view,
        nextBasemap: 'topo',
      }),
      'bottom-left'
    );
  }, []);

  return null;
};

export default MapWidgets;

import React, { useEffect } from 'react';
import AppContext from '../Context/AppContext';
import Graphic from '@arcgis/core/Graphic';

const Graphics = ({ view }) => {
  const { selectedAddress, selectedBookmark } = React.useContext(AppContext);

  // useEffect(() => {
  //   const glSearchResult = view.map.findLayerById('glSearchResult');
  //   if (glSearchResult) {
  //     glSearchResult.removeAll();
  //     if (!selectedAddress) return;
  //     const graph = new Graphic({
  //       geometry: {
  //         type: 'point',
  //         x: selectedAddress.location.x,
  //         y: selectedAddress.location.y,
  //         spatialReference: view.spatialReference,
  //       },
  //       symbol: {
  //         type: 'simple-marker',
  //         color: [244, 67, 54],
  //         path: 'M12,2C8.13,2 5,5.13 5,9c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zM12,11.5c-1.38,0 -2.5,-1.12 -2.5,-2.5s1.12,-2.5 2.5,-2.5 2.5,1.12 2.5,2.5 -1.12,2.5 -2.5,2.5z',
  //         size: 32,
  //         yoffset: 16,
  //         outline: {
  //           width: 0,
  //         },
  //       },
  //       popupTemplate: {
  //         title: selectedAddress.address,
  //         content: selectedAddress.address,
  //       },
  //     });
  //     glSearchResult.add(graph);
  //     view.goTo(graph);
  //     view.zoom = 9;
  //   }
  // }, [selectedAddress]);

  useEffect(() => {
    const glSearchResult = view.map.findLayerById('glSearchResult');
    if (glSearchResult) {
      glSearchResult.removeAll();
      if (!selectedBookmark) return;
      const graph = new Graphic({
        geometry: {
          type: 'point',
          x: selectedBookmark.location.x,
          y: selectedBookmark.location.y,
          spatialReference: view.spatialReference,
        },
        symbol: {
          type: 'simple-marker',
          color: [0, 255, 0],
          path: 'M12,2C8.13,2 5,5.13 5,9c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zM12,11.5c-1.38,0 -2.5,-1.12 -2.5,-2.5s1.12,-2.5 2.5,-2.5 2.5,1.12 2.5,2.5 -1.12,2.5 -2.5,2.5z',
          size: 32,
          yoffset: 16,
          outline: {
            width: 0,
          },
        },
        popupTemplate: {
          title: selectedBookmark.address,
          content: selectedBookmark.address,
        },
      });
      glSearchResult.add(graph);
      view.goTo(graph);
      view.zoom = 9;
    }
    console.log(view)
  }, [selectedBookmark]);

  return null;
};

export default Graphics;

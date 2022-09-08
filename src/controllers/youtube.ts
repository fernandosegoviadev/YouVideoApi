import { Request, Response } from "express";
const axios = require("axios");

require('dotenv').config();
const APY_KEY = process.env.APY_KEY_YOUTUBE


var promisResul: any;

/* Me trae resultados de la búsqueda por coincidencia de título. */
export const getVideos = async (req: Request, res: Response) => {

  let { search } = req.query;

  // console.log('sale el pedido a la api desde el back', search)

  let youTubeApi = "https://youtube.googleapis.com/youtube/v3/search";
  let part = "snippet";
  let query = search;

  const options = {
    method: 'GET',
    url: youTubeApi,
    params: {
      part: part,
      q: query,
      key: APY_KEY
    },
  };

  try {
    promisResul = await axios.request(options)
      .then(function (response: any) {
        // console.log(response.data);
        return response.data;

      }).catch(function (error: any) {

        console.error(error);
        return error.data;
      });

    return res.status(200).json(promisResul);

  } catch (error) {

    console.log(error);
    return res.send('Ocurrió un error');
  }


}
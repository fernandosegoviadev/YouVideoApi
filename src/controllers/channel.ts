import { Request, Response } from "express";
const axios = require("axios");

require('dotenv').config();
const APY_KEY = process.env.APY_KEY_YOUTUBE

/* Me trae resultados de la búsqueda dentro del canal,
siempre y cuando le pase el id del canal. Lo podría usar si
esto dentro del canal y quiero buscar algo allí. */
export const getChannel = async (req: Request, res: Response) => {

    let { channelId } = req.query; // "UCGnjeahCJW1AF34HBmQTJ-Q"

    // console.log('me llega el id del canal', channelId);

    let youTubeApi = "https://youtube.googleapis.com/youtube/v3/search";
    let part = "snippet";
    // let query = "te felicito";

    const options = {
      method: 'GET',
      url: youTubeApi,
      params: {
        part: part,
        // q: query,
        channelId: channelId,
        key: APY_KEY
      },
    };

    try {
      let channelResuls = await axios.request(options)
        .then(function (response: any) {
          // console.log(response.data);
          return response.data;

        }).catch(function (error: any) {

          console.error(error);
          return error.data;
        });

      return res.status(200).json(channelResuls);

    } catch (error) {

      console.log(error);
      return res.send('Ocurrió un error');
    }


}
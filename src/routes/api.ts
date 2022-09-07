import { Application, Request, Response } from "express";
import { getVideos } from '../controllers/youtube';
import { getChannel } from '../controllers/channel';
import { createUser, getUsers } from '../controllers/user';
import { createPlayList, editPlayList, getPlayLists,
  getListsByUserId, deletePlayList } from "../controllers/playLists";


export const loadApiEndpoints = (app: Application): void => {

  app.get("/", (req: Request, res: Response) => {
    return res.status(200).json('Servidor iniciado...');
  });

  // Responde con los resultados de la búsqueda
  //---------------------------------------------------------------------
  app.get("/youtube", getVideos);


  // Responde con el canal pedido
  //---------------------------------------------------------------------
  app.get("/channel", getChannel);


  // Crea un usuario en BD
  //---------------------------------------------------------------------
  app.post("/user", createUser);

  // Responde con todos los usuarios guardados en la BD
  //---------------------------------------------------------------------
  app.get("/users", getUsers);


  // Responde todas las listas
  //---------------------------------------------------------------------
  app.get("/playlists", getPlayLists);

  // Crea una playlist en la DB
  //---------------------------------------------------------------------
  app.post("/playlist", createPlayList);

  // Edita una playlist en la DB
  //---------------------------------------------------------------------
  app.put("/playlist", editPlayList);

  // Elimina una playlist de la BD
  //---------------------------------------------------------------------
  app.delete("/playlist", deletePlayList);


  // Responde con todas las playlists creadas por el usuario
  //---------------------------------------------------------------------
  app.get("/mylists", getListsByUserId);


};





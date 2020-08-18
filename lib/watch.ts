import { watch as watchDir } from 'fs';
import { Config } from './interfaces';
import main from './main';

export const watch = (config: Config) => {

  const watchDirs = config.watchDirs || config.model

  watchDirs.forEach((dir) => {
    console.info(`Start watching: ${dir}`);
    watchDir(dir,{persistent:true,recursive:true}, (eventType,fileName) => {

      console.info(`Detect ${fileName} ${eventType}`);

      main(config)
    });
  })
};

import { Router } from 'express';
import { GetMockFolders, CreateMockFolder } from '../controllers/config';
import l from 'lodash';
var router = Router();

router.get('/', function(req, res, next) {
  const folders = GetMockFolders();
  res.render('index', { folders, selectedFolder: req.query.folder });
});

router.post('/create-folder', function(req, res, next) {
  const folderName = req.body?.folderName || Date.now();
  const folderNameFormatted = l.kebabCase(l.lowerCase(folderName));

  CreateMockFolder(folderNameFormatted).then(() => {
    res.redirect('/configs?folder=' + folderNameFormatted);
  });
});

export default router;

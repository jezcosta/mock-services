import { Router } from 'express';
import { GetEnvironments } from '../controllers/environment';
import { GetMockFolders, GetMockSelected } from '../controllers/mock';

var router = Router();

router.get('/', function(req, res, next) {
  const folders = GetMockFolders();
  const environments = GetEnvironments();
  const mockSelected = GetMockSelected();
  res.render('index', { folders, environments, mockSelected, selectedFolder: req.query.folder });
});

export default router;

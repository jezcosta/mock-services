import { Router } from 'express';
import { GetMockOrService } from '../controllers/mock';

var router = Router();

const RouterHandler = (req, res, next) => {
  GetMockOrService(req).then((response) => {
    res.status(response.status);
    res.set(response.headers);
    res.send(response.data || {});
  }).catch((error) => {
    res.status(error.status);
    res.set(error.headers);
    res.send(error.data || {});
  });
};

router.get('/', RouterHandler);

router.get('/*', RouterHandler);

router.post('/*', RouterHandler);

router.patch('/*', RouterHandler);

router.put('/*', RouterHandler);

router.delete('/*', RouterHandler);

export default router;
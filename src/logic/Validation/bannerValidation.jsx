import { YupValidation } from 'src/logic/Validation/YupValidation';
import { object, string, boolean } from 'yup';

export class BannerValidation extends YupValidation {
  constructor() {
    super();
  }


  form = {
    banner_page: null,
    content: null,
    banner_width_size: null,
    banner_height_size: null,
    is_active: null,

  };

  schema = object().shape({
    banner_page: string().required('Banner Page Name is required').max(255, 'Banner Page name must be at most 255 characters'),
    banner_width_size: string().required('Banner Width Size is required').max(255, 'Banner Width Size must be at most 255 characters'),
    banner_height_size: string().required('Banner Height Size is required').max(500, 'Banner Height Size must be at most 500 characters'),
    content: string().required('Banner Content is required').max(100, 'Banner Content must be at most 100 characters'),
    is_active: boolean().nullable(),
  });
}
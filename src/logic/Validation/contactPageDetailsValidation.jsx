import { YupValidation } from 'src/logic/Validation/YupValidation';
import { object, string } from 'yup';

export class ContactPageDetailsValidation extends YupValidation {
  constructor() {
    super();
  }

  schema = object().shape({
    hero_title: string().nullable().max(255, 'Hero title must not exceed 255 characters'),
    hero_subtitle: string().nullable().max(255, 'Hero subtitle must not exceed 255 characters'),
    card_title: string().nullable().max(255, 'Card title must not exceed 255 characters'),
    card_subtitle: string().nullable().max(255, 'Card subtitle must not exceed 255 characters'),
    form_firstname_label: string().nullable().max(255, 'First name label must not exceed 255 characters'),
    form_firstname_placeholder: string().nullable().max(255, 'First name placeholder must not exceed 255 characters'),
    form_lastname_label: string().nullable().max(255, 'Last name label must not exceed 255 characters'),
    form_lastname_placeholder: string().nullable().max(255, 'Last name placeholder must not exceed 255 characters'),
    form_email_label: string().nullable().max(255, 'Email label must not exceed 255 characters'),
    form_email_placeholder: string().nullable().max(255, 'Email placeholder must not exceed 255 characters'),
    form_message_label: string().nullable().max(255, 'Message label must not exceed 255 characters'),
    form_message_placeholder: string().nullable().max(255, 'Message placeholder must not exceed 255 characters'),
    form_button_text: string().nullable().max(255, 'Button text must not exceed 255 characters'),
  });
}
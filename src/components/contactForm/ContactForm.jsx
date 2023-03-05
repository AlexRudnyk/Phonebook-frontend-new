import {
  FormikForm,
  FormLabel,
  FormInput,
  FormBtn,
} from './ContactForm.styled';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';

const schema = yup.object({
  name: yup
    .string()
    .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .min(2, 'Too short!')
    .max(30, 'Too long!')
    .required('Required'),
  email: yup.string(),
  phone: yup
    .string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
    )
    .min(5, 'Too short!')
    .max(30, 'Too long!')
    .required('Required'),
});

export const ContactForm = ({
  initialValues = { name: '', email: '', phone: '' },
  onSubmit,
  btnText,
}) => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      await onSubmit(values);
      resetForm();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormikForm>
        <FormLabel>Name</FormLabel>
        <ErrorMessage name="name" />
        <FormInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <FormLabel>Email</FormLabel>
        <ErrorMessage name="email" />
        <FormInput
          type="email"
          name="email"
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          // title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <FormLabel>Phone</FormLabel>
        <ErrorMessage name="phone" />
        <FormInput
          type="tel"
          name="phone"
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <FormBtn type="submit">{btnText}</FormBtn>
      </FormikForm>
    </Formik>
  );
};

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { z } from "zod";

interface IFormInputs {
  username: string
  password: string
}

const schemaLogin = z.object({
  username: z.string().min(6, { message: 'Required 6 caracters.' }),
  password: z.string().max(16, { message: 'Max caracters is 16.' }),
});

export default function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: zodResolver(schemaLogin),
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center">LOGIN</h2>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="username" placeholder="Enter username" {...register("username")} />
        <p className='text-danger'>{errors.username?.message}</p>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Password" {...register("password")} />
        <p className='text-danger'>{errors.password?.message}</p>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      {/* Componente link para esqueceu senha */}
      {/* Componente link para cadastrar usuario */}

      <div className="d-flex justify-content-center">
        <Button variant="primary" type="submit">
          Send
        </Button>
      </div>
    </Form>
  )
}

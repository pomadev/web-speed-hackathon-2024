import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Spacer, Stack } from '@chakra-ui/react';
import { useId, useState } from 'react';

import { useLogin } from '../../../features/auth/hooks/useLogin';

export const LoginContent: React.FC = () => {
  const login = useLogin();
  const loginContentA11yId = useId();

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login.mutate({ email: email, password: password })
  }

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleBlurEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setEmailError('メールアドレスを入力してください')
      return
    }
    const isValid = /@/.test(e.target.value)
    if (!isValid) {
      setEmailError('メールアドレスには @ を含めてください')
      return
    }
    setEmailError('')
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleBlurPassword = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setPasswordError('パスワードを入力してください')
      return
    }
    const isValid = /[!@#$%^&*(),.?":{}|<>]/g.test(e.target.value)
    if (!isValid) {
      setPasswordError('パスワードには記号を含めてください')
      return
    }
    setPasswordError('')
  }

  return (
    <Box
      aria-labelledby={loginContentA11yId}
      as="form"
      bg="gray.100"
      borderRadius={8}
      onSubmit={handleSubmit}
      p={6}
      w="100%"
    >
      <Stack spacing={4}>
        <Heading as="h1" fontSize="xl" fontWeight="bold" id={loginContentA11yId}>
          ログイン
        </Heading>

        <FormControl isInvalid={emailError !== ''}>
          <FormLabel>メールアドレス</FormLabel>
          <Input
            bgColor="white"
            borderColor="gray.300"
            name="email"
            onBlur={handleBlurEmail}
            onChange={handleChangeEmail}
            placeholder="メールアドレス"
          />
          <FormErrorMessage role="alert">{emailError}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={passwordError !== ''}>
          <FormLabel>パスワード</FormLabel>
          <Input
            bgColor="white"
            borderColor="gray.300"
            name="password"
            onBlur={handleBlurPassword}
            onChange={handleChangePassword}
            placeholder="パスワード"
            type="password"
          />
          <FormErrorMessage role="alert">{passwordError}</FormErrorMessage>
        </FormControl>

        <Spacer />

        <Button colorScheme="teal" type="submit" variant="solid">
          ログイン
        </Button>
      </Stack>
    </Box>
  );
};

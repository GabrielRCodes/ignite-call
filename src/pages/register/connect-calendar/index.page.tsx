/* eslint-disable prettier/prettier */
import { Heading, MultiStep, Text, Button } from "@ignite-ui/react";
import { Container, Header } from "../styles";
import { ArrowRight, Check } from "phosphor-react"
// import { api } from "../../lib/axios";
import { AuthError, ConnectBox, ConnectItem } from "./styles";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ConnectCalendar() {

  const session = useSession()
  const router = useRouter()

  console.log(session)

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === "authenticated"

  // async function handleRegister(data: RegisterFormData) {

  // }

  async function handleConnectCalendar() {
    await signIn("google")
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">
          Conecte sua agenda!
        </Heading>
        <Text>
          Conecte o se calendário para verificar automaticamente as horas ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isSignedIn 
            ? 
            (
              <Button size="sm" disabled>
                Conectado
                <Check />
              </Button>
            )
            :
            (
              <Button variant="secondary" size="sm" onClick={handleConnectCalendar}>
                Conectar
                <ArrowRight />
              </Button>
            )
          }
        </ConnectItem>

        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as permissões de acesso ao Google Calendar.
          </AuthError>
        )}

        <Button type="submit" disabled={!isSignedIn}>
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>

    </Container>
  )
}
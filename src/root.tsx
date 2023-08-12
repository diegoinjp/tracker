// @refresh reload
import { Suspense } from 'solid-js'
import { useLocation, Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title } from 'solid-start'
import './root.css'
import { SITE_TITLE } from './utils/consts'

export default function Root() {
  const location = useLocation()
  const active = (path: string) => (path == location.pathname ? 'border-sky-600' : 'border-transparent hover:border-sky-600')
  return (
    <Html lang="en">
      <Head>
        <Title>{SITE_TITLE}</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <nav class="bg-sky-800">
              <ul class="container flex items-center p-3 text-gray-200">
                <li class={`border-b-2 mx-1.5 sm:mx-6`}>{SITE_TITLE}</li>
              </ul>
            </nav>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}

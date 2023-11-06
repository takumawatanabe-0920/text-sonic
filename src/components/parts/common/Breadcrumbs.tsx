// TODO: 見た目を整える
// TODO: idの時の対応 (/reports/640f15729eb3890008e599f8の時のidからタイトルが取得できるように)
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

type ReportBreadcrumbsProps = {
  reportDetailTitle?: string;
  questionTitle?: string;
};

const ReportBreadcrumbs: React.FC<ReportBreadcrumbsProps> = (props) => {
  const { reportDetailTitle, questionTitle } = props;
  const router = useRouter();
  const env = router.query.env as string;
  const paths = decodeURI(router.asPath).substring(1).split('/');

  // split path
  const [_, reportDetailPath, questionPath] = decodeURI(router.asPath)
    .substring(1)
    .split('/') as [string, string, string];

  const pathMap = {
    [reportDetailPath]: reportDetailTitle,
    [questionPath]: questionTitle,
  };

  // create breadcrumbs
  const breadcrumbs = paths
    .map((path, index) => {
      if (!path) return null;
      const href = `/${paths.slice(0, index + 1).join('/')}`;
      const name = pathMap[path as keyof typeof pathMap];
      if (!name) return null;
      return { href, name };
    })
    .filter(Boolean) as { href: string; name: string }[];

  return (
    <Container>
      <Link
        href={{
          pathname: '/',
          query: { env },
        }}
      >
        ホーム
      </Link>
      {breadcrumbs.map((b, i) =>
        i !== breadcrumbs.length - 1 ? (
          <React.Fragment key={i}>
            {'>'}
            <Link
              href={{
                pathname: b.href,
                query: { env },
              }}
              key={b.name}
            >
              {b.name}
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment key={i}>
            {'>'}
            <div>{b.name}</div>
          </React.Fragment>
        ),
      )}
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ReportBreadcrumbs;

import type { GatsbyNode } from 'gatsby';
import path from 'path';
import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface IWork {
  readonly name: string;
  readonly description: string;
  readonly roles: string[];
  readonly datePublished: string;
  readonly preview: { image: IGatsbyImageData };
}

interface IPersonalInfo {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly blurb: string;
  readonly portrait: { image: IGatsbyImageData };
}

export interface PageContextType {
  roles: string[];
  works: IWork[];
  personalInfo: IPersonalInfo;
}

// eslint-disable-next-line import/prefer-default-export
export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  // @ts-ignore
  const { data }: { data: Queries.PageQuery } = await graphql(`
    query Page {
      info: allContentfulPersonalInfo(limit: 1) {
        nodes {
          firstName
          lastName
          email
          phoneNumber
          blurb
          portrait {
            image: gatsbyImage(width: 140, height: 140)
          }
        }
      }

      works: allContentfulWork {
        nodes {
          roles
          name
          datePublished
          description
          preview {
            image: gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
    }
  `);
  const rolesToWorks: Record<string, IWork[]> = {};
  const works: IWork[] = data.works.nodes.filter((i): i is IWork => {
    return typeof i === 'object';
  });

  works.forEach((work) => {
    work.roles.forEach((role) => {
      if (rolesToWorks[role] === undefined) {
        rolesToWorks[role] = [work];
      } else {
        rolesToWorks[role].push(work);
      }
    });
  });

  const roles = Object.keys(rolesToWorks);

  roles.forEach((role) => {
    const slug = `/${role.toLowerCase()}`;
    const context: PageContextType = {
      roles: Array.from(roles),
      works: rolesToWorks[role],
      personalInfo: data.info.nodes[0] as IPersonalInfo,
    };

    actions.createPage({
      path: slug,
      component: path.resolve(`./src/templates/works.tsx`),
      context,
    });
  });
};

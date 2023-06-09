import { IGatsbyImageData } from 'gatsby-plugin-image';
import _ from 'lodash';

export interface IWork {
  readonly name: string;
  readonly description: string;
  readonly roles: string[];
  readonly datePublished: string;
  readonly preview: { image: IGatsbyImageData };
  readonly link: string;
}

const mapWorks = _.memoize((works: IWork[]) => {
  const rolesToWorks: Record<string, IWork[]> = {};
  // TODO: Use reduce
  works.forEach((work) => {
    work.roles.forEach((role) => {
      if (rolesToWorks[role] === undefined) {
        rolesToWorks[role] = [work];
      } else {
        rolesToWorks[role].push(work);
      }
    });
  });
  return rolesToWorks;
},
  // TODO: Use react hooks instead of memo
(i) => 0 // Only run once
);

export default mapWorks;

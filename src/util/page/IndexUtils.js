import _ from 'lodash';
const mapWorks = _.memoize((works) => {
    const rolesToWorks = {};
    // TODO: Use reduce
    works.forEach((work) => {
        work.roles.forEach((role) => {
            if (rolesToWorks[role] === undefined) {
                rolesToWorks[role] = [work];
            }
            else {
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

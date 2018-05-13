import { IAppState } from '../../store';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import LightSwitch, { ILightSwitch } from '../content/LightSwitch';
import * as React from 'react';

export interface ILightsProps {
  store?: IAppState;
}
class Lights extends React.Component<ILightsProps, {}> {
  render() {
    const { store } = this.props;
    const { lights = [] } = store!.appStore;
    const groups = {};

    lights.map(light => {
      const group = light.group ? light.group : 'noGroup';
      if (groups.hasOwnProperty(group)) {
        groups[group].push(light);
      } else {
        groups[group] = [light];
      }
    });

    const groupsArr = [];
    for (const groupKey in groups) {
      if (groups.hasOwnProperty(groupKey)) {
        const lightsArr: ILightSwitch[] = groups[groupKey];
        groupsArr.push(lightsArr);
      }
    }

    const cardRows = [];
    let temp = [];
    let count = 0;
    for (const group of groupsArr) {
      temp.push(group);
      count += 1;
      if (count % 3 === 0 || count === groupsArr.length) {
        cardRows.push(temp);
        temp = [];
      }
    }

    return (
      <div className="container-fluid">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/lights">Lights</Link>
          </li>
          <li className="breadcrumb-item active">Control house lighting</li>
        </ol>
        <article>
          {cardRows.map((row, i) => (
            <div className="row" key={`lights-row-${i}`}>
              {row.map(group => {
                const firstLight = group[0];
                return (
                  <div className="col-md-4 mb-3" key={`lights-column-${firstLight.group}`}>
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">
                          {firstLight.groupLabel ? firstLight.groupLabel : 'Lights'}
                        </h5>
                        <fieldset>
                          {group.map(light => (
                            <LightSwitch key={`light-${light.id}`} storeKey="lights" {...light} />
                          ))}
                        </fieldset>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </article>
      </div>
    );
  }
}

export default inject('store')(observer(Lights));

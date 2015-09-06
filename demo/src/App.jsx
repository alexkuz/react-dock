import React, { Component, PropTypes } from 'react';
import radium from 'radium';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Input from 'react-bootstrap/lib/Input';

import Dock from '../../src/Dock';

const styles = {
  root: {
    fontSize: '16px',
    color: '#999',
    width: '100vw',
    height: '100vh'
  },
  main: {
    width: '100%',
    height: '150%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '30vh'
  },
  dockContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  remove: {
    position: 'absolute',
    zIndex: 1,
    right: '10px',
    top: '10px',
    cursor: 'pointer'
  }
}

const positions = ['left', 'top', 'right', 'bottom'];
const dimModes = ['transparent', 'none', 'opaque'];

@radium
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positionIdx: 0,
      dimModeIdx: 0,
      isVisible: true,
      fluid: true,
      customAnimation: false,
      slow: false
    };
  }

  componentDidMount() {
  }

  render() {
    const duration = this.state.slow ? 2000 : 200;
    const dur = duration / 1000;
    const transitions = ['left', 'top', 'width', 'height']
      .map(p => `${p} ${dur}s cubic-bezier(0, 1.5, 0.5, 1)`)
      .join(',');

    return (
      <div style={[styles.root]}>
        <div style={[styles.main]}>
          <h1>Main Content</h1>
          <div>
            <div>Position: {positions[this.state.positionIdx]}
              <Button onClick={this.handlePositionClick}
                      style={{ marginLeft: '20px' }}>Change</Button>
            </div>
            <div>Dim Mode: {dimModes[this.state.dimModeIdx]}
              <Button onClick={this.handleDimModeClick}
                      style={{ marginLeft: '20px' }}>Change</Button>
            </div>
            <Input type='checkbox'
                   label='is visible'
                   checked={this.state.isVisible}
                   onChange={() => this.setState({
                     isVisible: !this.state.isVisible
                   })} />

            <Input type='checkbox'
                   label='custom animation'
                   checked={this.state.customAnimation}
                   onChange={() => this.setState({
                     customAnimation: !this.state.customAnimation })
                   } />

            <Input type='checkbox'
                   label='slow'
                   checked={this.state.slow}
                   onChange={() => this.setState({
                     slow: !this.state.slow })
                   } />

            <Input type='checkbox'
                   label='fluid'
                   checked={this.state.fluid}
                   onChange={() => this.setState({
                     fluid: !this.state.fluid
                   })} />
          </div>
        </div>
        <Dock position={positions[this.state.positionIdx]}
              dimMode={dimModes[this.state.dimModeIdx]}
              isVisible={this.state.isVisible}
              onVisibleChanged={this.handleVisibleChanged}
              fluid={this.state.fluid}
              dimStyle={{ background: 'rgba(0, 0, 100, 0.2)' }}
              dockStyle={this.state.customAnimation ? { transition: transitions } : null}
              dockHiddenStyle={this.state.customAnimation ? {
                transition: [transitions, `opacity 0.01s linear ${dur}s`].join(',')
              } : null}
              duration={duration}>
          {({ position, isResizing }) =>
            <div style={[styles.dockContent]}>
              <h1>Dock Content</h1>
              <div>Position: {position}</div>
              <div>Resizing: {isResizing ? 'true' : 'false'}</div>
              <Glyphicon glyph='remove'
                         onClick={() => this.setState({ isVisible: false })}
                         style={styles.remove} />
            </div>
          }
        </Dock>
      </div>
    );
  }

  handleVisibleChanged = isVisible => {
    this.setState({ isVisible });
  }

  handlePositionClick = () => {
    this.setState({ positionIdx: (this.state.positionIdx + 1) % 4 });
  }

  handleDimModeClick = () => {
    this.setState({ dimModeIdx: (this.state.dimModeIdx + 1) % 3 });
  }
}

import { Component } from 'react';
import posed, { PoseGroup } from 'react-pose';
import { h } from 'react-hyperscript-helpers';

const TransitionPose = posed.div({
  preEnter: {
    flip: true,
    width: ({ poseProps: { width } }) => width,
    height: ({ poseProps: { height } }) => height,
  },
  enter: {
    flip: true,
    width: 'auto',
    height: 'auto',
    transition: { duration: 1000 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0 },
  },
});

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  padding: 15,
};

export default class App extends Component {
  state = {
    viewKey: 'a',
    poseProps: {},
  };

  onClick() {
    const poseProps = this.viewRef.getBoundingClientRect();
    this.setState({
      viewKey: this.state.viewKey === 'a'
        ? 'b'
        : 'a',
      poseProps,
    });
  }

  render() {
    const { viewKey, poseProps } = this.state;

    return h('div', { onClick: () => this.onClick(), style: containerStyle }, [
      h(PoseGroup, { preEnterPose: 'preEnter', poseProps }, [
        h(TransitionPose, { key: viewKey }, [
          h(views[viewKey], { innerRef: (c) => { if (c) this.viewRef = c; } }),
        ]),
      ]),
    ]);
  }
}

const viewStyle = {
  padding: 15,
  backgroundColor: 'white',
};

const views = {
  a({ innerRef }) {
    return h('div', { ref: innerRef, style: viewStyle }, [
      h('div', 'Qui delectus natus dignissimos nemo quod soluta. Nam nostrum voluptatem officiis minima nihil. Quia at voluptatem optio iure et atque rerum fugiat. Eius ab non in veritatis. Molestiae et non odit totam. Natus occaecati recusandae doloribus veritatis voluptatem.'),
    ]);
  },
  b({ innerRef }) {
    return h('div', { ref: innerRef, style: viewStyle }, [
      h('div', 'Qui delectus natus dignissimos nemo quod soluta.'),
      h('div', 'Nam nostrum voluptatem officiis minima nihil.'),
      h('div', 'Quia at voluptatem optio iure et atque rerum fugiat.'),
      h('div', 'Eius ab non in veritatis.'),
      h('div', 'Molestiae et non odit totam.'),
      h('div', 'Natus occaecati recusandae doloribus veritatis voluptatem.'),
    ]);
  }
};

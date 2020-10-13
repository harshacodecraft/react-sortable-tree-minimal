import React, { Component } from 'react';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import FileExplorerTheme from '../index';
import Category from './images/category.svg';
import Question from './images/question.svg';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      searchFocusIndex: 0,
      searchFoundCount: null,
      treeData: [
        { title: '.gitignore', id:1 },
        { title: 'package.json', id: 2 },
        {
          title: 'src',
          isDirectory: true,
          expanded: true,
          id: 3,
          children: [
            { title: 'styles.css', id: 4 },
            { title: 'index.js', id: 5 },
            { title: 'reducers.js', id: 6 },
            { title: 'actions.js', id: 7 },
            { title: 'utils.js', id: 8 },
          ],
        },
        {
          title: 'tmp',
          isDirectory: true,
          id: 9,
          children: [
            { title: '12214124-log', id: 10 },
            { title: 'drag-disabled-file', dragDisabled: true, id: 11 },
          ],
        },
        {
          title: 'build',
          isDirectory: true,
          id: 12,
          children: [{ title: 'react-sortable-tree.js', id: 13 }],
        },
        {
          title: 'public',
          isDirectory: true,
          id: 14
        },
        {
          title: 'node_modules',
          isDirectory: true,
          id: 15
        },
      ],
    };

    this.updateTreeData = this.updateTreeData.bind(this);
    this.expandAll = this.expandAll.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
  }

  updateTreeData(treeData) {
    this.setState({ treeData });
  }

  expand(expanded) {
    this.setState({
      treeData: toggleExpandedForAll({
        treeData: this.state.treeData,
        expanded,
      }),
    });
  }

  expandAll() {
    this.expand(true);
  }

  collapseAll() {
    this.expand(false);
  }

  nodeClicked(event, rowInfo) {
    if (event.target.className.includes('collapseButton') ||
        event.target.className.includes('expandButton')) {
        // ignore the event
    } else {
      this.setState({selectedNodeId: rowInfo.node.id});
    }
  }

  render() {
    const {
      treeData,
      searchString,
      searchFocusIndex,
      searchFoundCount,
    } = this.state;

    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
      >
        {/* <div style={{ flex: '0 0 auto', padding: '0 15px' }}>
          <h3>File Explorer Theme</h3>
          <button onClick={this.expandAll}>Expand All</button>
          <button onClick={this.collapseAll}>Collapse All</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <form
            style={{ display: 'inline-block' }}
            onSubmit={event => {
              event.preventDefault();
            }}
          >
            <label htmlFor="find-box">
              Search:&nbsp;
              <input
                id="find-box"
                type="text"
                value={searchString}
                onChange={event =>
                  this.setState({ searchString: event.target.value })
                }
              />
            </label>

            <button
              type="button"
              disabled={!searchFoundCount}
              onClick={selectPrevMatch}
            >
              &lt;
            </button>

            <button
              type="submit"
              disabled={!searchFoundCount}
              onClick={selectNextMatch}
            >
              &gt;
            </button>

            <span>
              &nbsp;
              {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
              &nbsp;/&nbsp;
              {searchFoundCount || 0}
            </span>
          </form>
        </div> */}

        <div style={{ flex: '1 0 50%', marginTop: '20px' }}>
          <SortableTree
            theme={FileExplorerTheme}
            treeData={treeData}
            rowHeight={30}
            scaffoldBlockPxWidth={28}
            onChange={this.updateTreeData}
            className="my-tree"
            searchQuery={searchString}
            searchFocusOffset={searchFocusIndex}
            random=""
            searchFinishCallback={matches =>
              this.setState({
                searchFoundCount: matches.length,
                searchFocusIndex:
                  matches.length > 0 ? searchFocusIndex % matches.length : 0,
              })
            }
            canDrag={({ node }) => !node.dragDisabled}
            canDrop={({ nextParent }) => !nextParent || nextParent.isDirectory}
            generateNodeProps={(rowInfo) => {
              const nodeProps = {
                onClick: (event) => this.nodeClicked(event, rowInfo),
                selectedNodeId: this.state.selectedNodeId,
                icons: rowInfo.node.isDirectory
                  ? [
                      <div className="flex-center">
                        <img src={Category} width="20" alt="Category" />
                      </div>,
                    ]
                  : [
                      <div className="flex-center">
                        <img src={Question} width="20" alt="Question" />
                      </div>,
                    ]
              }
              return nodeProps;
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;

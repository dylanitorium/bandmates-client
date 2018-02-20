import { compose } from 'redux';
import { connect } from 'react-redux';
import conditionalComponent from 'hoc/conditionalComponent';
import SectionDetailsInterface from 'components/pure/WaveForm/SectionDetailsInterface/SectionDetailsInterface';
import * as sectionsActions from 'state/modules/sections/actions';

const mapStateToProps = state => ({
  visible: state.sections.commentBoxIsOpen,
  sectionId: state.sections.activeSection,
});

const mapDispatchToProps = {
  closeCommentBox: sectionsActions.closeCommentBox,
  addComment: sectionsActions.addCommentThunk,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  conditionalComponent,
)(SectionDetailsInterface);

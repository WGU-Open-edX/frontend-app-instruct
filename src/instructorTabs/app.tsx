import { App, WidgetOperationTypes } from '@openedx/frontend-base';
import { Tab } from '@openedx/paragon';

const config: App = {
  appId: 'org.openedx.frontend.slot.instructor.tabBar',
  slots: [
    {
      slotId: 'org.openedx.frontend.slot.instructor.tabs.tab.v1',
      id: 'org.openedx.frontend.widget.instructor.tab.courseInfo',
      op: WidgetOperationTypes.APPEND,
      component: () => <Tab eventKey="courseInfo" title="Course Info" />,
    },
    {
      slotId: 'org.openedx.frontend.slot.instructor.tabs.tab.v1',
      id: 'org.openedx.frontend.widget.instructor.tab.enrollments',
      op: WidgetOperationTypes.APPEND,
      component: () => <Tab eventKey="enrollments" title="Enrollments" />,
    },
    {
      slotId: 'org.openedx.frontend.slot.instructor.tabs.tab.v1',
      id: 'org.openedx.frontend.widget.instructor.tab.courseTeam',
      op: WidgetOperationTypes.APPEND,
      component: () => <Tab eventKey="courseTeam" title="Course Team" />,
    },
    {
      slotId: 'org.openedx.frontend.slot.instructor.tabs.tab.v1',
      id: 'org.openedx.frontend.widget.instructor.tab.grading',
      op: WidgetOperationTypes.APPEND,
      component: () => <Tab eventKey="grading" title="Grading" />,
    },
    {
      slotId: 'org.openedx.frontend.slot.instructor.tabs.tab.v1',
      id: 'org.openedx.frontend.widget.instructor.tab.dateExtensions',
      op: WidgetOperationTypes.APPEND,
      component: () => <Tab eventKey="dateExtensions" title="Date Extensions" />,
    },
    {
      slotId: 'org.openedx.frontend.slot.instructor.tabs.tab.v1',
      id: 'org.openedx.frontend.widget.instructor.tab.dataDownloads',
      op: WidgetOperationTypes.APPEND,
      component: () => <Tab eventKey="dataDownloads" title="Data Downloads" />,
    },
    {
      slotId: 'org.openedx.frontend.slot.instructor.tabs.tab.v1',
      id: 'org.openedx.frontend.widget.instructor.tab.openResponses',
      op: WidgetOperationTypes.APPEND,
      component: () => <Tab eventKey="openResponses" title="Open Responses" />,
    },
    {
      slotId: 'org.openedx.frontend.slot.instructor.tabs.tab.v1',
      id: 'org.openedx.frontend.widget.instructor.tab.certificates',
      op: WidgetOperationTypes.APPEND,
      component: () => <Tab eventKey="certificates" title="Certificates" />,
    },
    {
      slotId: 'org.openedx.frontend.slot.instructor.tabs.tab.v1',
      id: 'org.openedx.frontend.widget.instructor.tab.cohorts',
      op: WidgetOperationTypes.APPEND,
      component: () => <Tab eventKey="cohorts" title="Cohorts" />,
    },
    {
      slotId: 'org.openedx.frontend.slot.instructor.tabs.tab.v1',
      id: 'org.openedx.frontend.widget.instructor.tab.specialExams',
      op: WidgetOperationTypes.APPEND,
      component: () => <Tab eventKey="specialExams" title="Special Exams" />,
    },
  ]
};

export default config;

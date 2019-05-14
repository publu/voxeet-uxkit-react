import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { strings } from '../../../languages/localizedStrings';
import { Actions as ActiveSpeakerActions } from '../../../actions/ActiveSpeakerActions'

import Speaker from './Speaker'
import SpeakerActive from './SpeakerActive'
import SpeakerVideo from './SpeakerVideo'
import SpeakerDetails from './SpeakerDetails'
import AttendeesParticipantBar from '../AttendeesParticipantBar'
import ScreenshareMode from './presentationMode/ScreenshareMode'
import FilePresentationMode from './presentationMode/FilePresentationMode'

@connect((store) => {
    return {
        activeSpeakerStore: store.voxeet.activeSpeaker
    }
})

class Speakers extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(ActiveSpeakerActions.startActiveSpeaker())
    }

    componentWillUnmount() {
        this.props.dispatch(ActiveSpeakerActions.stopActiveSpeaker())
    }

    render() {
        const { participants, forceActiveSpeaker, disableForceActiveSpeaker, forceFullscreen, toggleMicrophone, isWidgetFullScreenOn, screenShareEnabled, filePresentationEnabled, isFilePresentation, screenShareStream, isAdmin, kickParticipant, isAdminActived, userIdStreamScreenShare, currentUser, isWebinar, isScreenshare, isElectron } = this.props
        const { activeSpeaker, forceActiveUserEnabled } = this.props.activeSpeakerStore
        let activeSpeakerChecker = activeSpeaker
        if (activeSpeakerChecker == null) {
          activeSpeakerChecker = participants[0]
        }
        if (participants.length == 0) {
          activeSpeakerChecker = currentUser
        }
        return (
            <div className="SidebarSpeaker">
                {((activeSpeakerChecker || screenShareEnabled) && !filePresentationEnabled) &&
                    <ScreenshareMode
                        participants={participants}
                        participant={activeSpeakerChecker}
                        isAdmin={isAdmin}
                        isAdminActived={isAdminActived}
                        kickParticipant={kickParticipant}
                        isElectron={isElectron}
                        toggleMicrophone={toggleMicrophone}
                        isWidgetFullScreenOn={(forceFullscreen || isWidgetFullScreenOn)}
                        screenShareEnabled={screenShareEnabled}
                        filePresentationEnabled={filePresentationEnabled}
                        currentUser={currentUser}
                        isScreenshare={isScreenshare}
                        screenShareStream={screenShareStream}
                    />
                }
                {  filePresentationEnabled && 
                    <FilePresentationMode
                        participants={participants}
                        participant={activeSpeakerChecker}
                        isAdmin={isAdmin}
                        isAdminActived={isAdminActived}
                        kickParticipant={kickParticipant}
                        isElectron={isElectron}
                        toggleMicrophone={toggleMicrophone}
                        isWidgetFullScreenOn={(forceFullscreen || isWidgetFullScreenOn)}
                        screenShareEnabled={screenShareEnabled}
                        filePresentationEnabled={filePresentationEnabled}
                        isFilePresentation={isFilePresentation}
                        currentUser={currentUser}
                        isScreenshare={isScreenshare}
                        screenShareStream={screenShareStream}
                    />

                }
                <div className="SidebarList">
                    <ul className="list-items">
                        { (!isWebinar || (isWebinar && isAdmin)) &&
                            <li className={'item small-item participant-available myself'}>
                                <SpeakerDetails participant={currentUser} isWidgetFullScreenOn={isWidgetFullScreenOn} />
                                <SpeakerVideo mySelf={true} participant={currentUser} />
                                {isWidgetFullScreenOn && <AttendeesParticipantBar participant={currentUser} />}
                            </li>
                        }
                        {participants.map((participant, i) => {
                            return(<Speaker key={i}
                                participant={participant}
                                toggleMicrophone={toggleMicrophone}
                                kickParticipant={kickParticipant}
                                isAdmin={isAdmin}
                                nbParticipant={i}
                                screenShareEnabled={screenShareEnabled}
                                activeSpeaker={activeSpeakerChecker}
                                forceActiveUserEnabled={forceActiveUserEnabled}
                                isAdminActived={isAdminActived}
                                isWidgetFullScreenOn={isWidgetFullScreenOn}
                                disableForceActiveSpeaker={disableForceActiveSpeaker}
                                forceActiveSpeaker={forceActiveSpeaker} />)
                            }
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

Speakers.propTypes = {
    participants: PropTypes.array.isRequired,
    forceActiveSpeaker: PropTypes.func.isRequired,
    disableForceActiveSpeaker: PropTypes.func.isRequired,
    userIdStreamScreenShare: PropTypes.string,
    isWebinar: PropTypes.bool.isRequired,
    isScreenshare: PropTypes.bool,
    isFilePresentation: PropTypes.bool,
    toggleMicrophone: PropTypes.func.isRequired,
    isElectron: PropTypes.bool.isRequired,
    isWidgetFullScreenOn: PropTypes.bool.isRequired,
    screenShareEnabled: PropTypes.bool.isRequired,
    filePresentationEnabled: PropTypes.bool.isRequired,
    userIdFilePresentation: PropTypes.string,
    screenShareStream: PropTypes.object,
    userStream: PropTypes.object,
    kickParticipant: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isAdminActived: PropTypes.bool.isRequired,
}

export default Speakers

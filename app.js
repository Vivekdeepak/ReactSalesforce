/*
 * Copyright (c) 2017-present, salesforce.com, inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided
 * that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the
 * following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
 * promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import React, {Component} from 'react';
import { StyleSheet,View } from 'react-native';

import {
  Container,
  Header,
  Title,
  Icon,
  Tabs,
  Tab,
  Right,
  Left,
  FooterTab,
  Footer,
  Body,
  Content
} from "native-base";
import { Button,List,ListItem } from 'react-native-elements';

import { StackNavigator } from 'react-navigation';
import {oauth, net, smartstore, smartsync} from 'react-native-force';


class UserListScreen extends React.Component {

  static navigationOptions = {
    title: 'Appointments',
  };
    constructor(props) {
        super(props);
        this.state = {data: []};
    }
    
    componentDidMount() {
        var that = this;
        oauth.getAuthCredentials(
            () => that.fetchData(), // already logged in
            () => {
                oauth.authenticate(
                    () => that.fetchData(),
                    (error) => console.log('Failed to authenticate:' + error)
                );
            });
    }

    fetchData() {
        var that = this;
        net.sendRequest('/services/apexrest/gmobile/getallservicedata?ExpertId=0056E000003YAFvQAO','',
                  (response) => {
                    //console.log(JSON.stringify(response.serviceAppointmentInformations));
                    that.setState({data: response.serviceAppointmentInformations});
                  }
                 );
    }

    render() {
        return (
           
            <Container style={styles.container}>
                <Content>
                <List>
                      {
                        this.state.data.map((item, i) => (
                          <ListItem
                            key={i}
                            title= {item.sa_number}
                            subtitle= {item.sa_wifiIssue}
                            leftIcon= {{name :'perm-contact-calendar'}}
                          />
                        ))
                      }
                    </List>
                </Content>
            </Container>

           
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        paddingTop: 0,
        backgroundColor: 'white',
    },
    item: {
        padding: 0,
        fontSize: 18,
        height: 44,
    }
});

export const App = StackNavigator({
    UserList: { screen: UserListScreen }
});




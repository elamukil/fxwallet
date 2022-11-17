/*
 * KBX Digital Pvt Ltd ("COMPANY") CONFIDENTIAL                                *
 * Copyright (c) 2022 KBX Digital Pvt Ltd, All rights reserved                 *
 *                                                                             *
 * NOTICE:  All information contained herein is, and remains the property      *
 * of COMPANY. The intellectual and technical concepts contained herein are    *
 * proprietary to COMPANY and may be covered by Indian and Foreign Patents,    *
 * patents in process, and are protected by trade secret or copyright law.     *
 * Dissemination of this information or reproduction of this material is       *
 * strictly forbidden unless prior written permission is obtained from         *
 * COMPANY. Access to the source code contained herein is hereby forbidden     *
 * to anyone except current COMPANY employees, managers or contractors who     *
 * have executed Confidentiality and Non-disclosure agreements explicitly      *
 * covering such access.                                                       *
 *                                                                             *
 * The copyright notice above does not evidence any actual or intended         *
 * publication or disclosure of this source code, which includes               *
 * information that is confidential and/or proprietary, and is a trade secret, *
 * of COMPANY. ANY REPRODUCTION, MODIFICATION, DISTRIBUTION, PUBLIC            *
 * PERFORMANCE, OR PUBLIC DISPLAY OF OR THROUGH USE OF THIS SOURCE CODE        *
 * WITHOUT THE EXPRESS WRITTEN CONSENT OF COMPANY IS STRICTLY PROHIBITED,      *
 * AND IN VIOLATION OF APPLICABLE LAWS AND INTERNATIONAL TREATIES. THE         *
 * RECEIPT OR POSSESSION OF THIS SOURCE CODE AND/OR RELATED INFORMATION DOES   *
 * NOT CONVEY OR IMPLY ANY RIGHTS TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS     *
 * CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT MAY DESCRIBE,    *
 * IN WHOLE OR IN PART.                                                        *
 *                                                                             *
 * File: \screens\CloseAccountScreen.js                                        *
 * Project: kbxwallet                                                          *
 * Created Date: Tuesday, November 15th 2022, 1:49:39 am                       *
 * Author: Tamil Elamukil <tamil@kbxdigital.com>                               *
 * -----                                                                       *
 * Last Modified: November 15th 2022, 3:20:41 am                               *
 * Modified By: Tamil Elamukil                                                 *
 * -----                                                                       *
 * Any app that can be written in JavaScript,                                  *
 *     will eventually be written in JavaScript !!                             *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date         By  Comments                                                   *
 * --------------------------------------------------------------------------- *
 */
import React from 'react';
import { View, Alert } from 'react-native'
import axios from 'axios'

const CloseAccountScreen = ({ principalAmount, accountId, phoneNumber, pin }) => {

    function closeAccount(principalAmount, accountId) {

        console.log("principalAmount", principalAmount);
        Alert.alert(
          "Do you really want to close account?",
          "Click OK to Continue",
          [ {
            text: "Cancel",
          },
            {
              text: "OK",
              onPress: () => {
                let verifyRequest = {
                  requestType: "TDC",
                  fromAccounts: [
                    { phoneNumber: accountId, amount: principalAmount },
                  ],
                  toAccounts: [
                    {
                      phoneNumber: phoneNumber,
                      amount: principalAmount,
                    },
                  ],
                };
                console.log("verifyRequest", verifyRequest);
                axios
                  .post(
                    "https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/transfer",
                    verifyRequest
                  )
                  .then((res) => {
                    console.log("hello", res.data);
                    let verifyRequest1 = {
                      accountId: accountId,
                    };
                    axios
                      .put(
                        "https://4iehnbxhnk.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/accounts/td/status",
                        verifyRequest1
                      )
                      .then(() => {
                        console.log("deleted");
                        Alert.alert(
                          "Account deleted successfully",
                          "Click ok to Continue",
                          [
                            {
                              text: "Ok",
                            },
                          ]
                        );
                      })
                      .catch((error) => {
                        console.log("not deleted");
                        Alert.alert(
                            "Uh oh!",
                            "We are unable to process your request at this")
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                    Alert.alert(
                      "Uh oh!",
                      "We are unable to process your request at this",
                      [
                        {
                          text: "Proceed",
                        },
                      ]
                    );
                  });
              },
            },
          ]
        );
      }
    return (
        <View>
            {closeAccount(principalAmount,accountId)}
        </View>
    );
}

export default CloseAccountScreen;


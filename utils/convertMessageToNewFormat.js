const convertMessageToNewFormat = (message) => {
  const resultedCaseMessage = message.match(/(<DC:ResultedCaseMessage[\s\S]*<\/DC:ResultedCaseMessage>)/)[0];
  const externalCorrelationId = message.match(/<msg:MessageIdentifier>([\s\S]*)<\/msg:MessageIdentifier>/)[1]?.trim();

  const result = `<?xml version="1.0" encoding="UTF-8"?>
  <RouteData xmlns="http://schemas.cjse.gov.uk/common/operations" xmlns:cjseEntity="http://schemas.cjse.gov.uk/common/businessentities" xmlns:cjseType="http://schemas.cjse.gov.uk/common/businesstypes" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" VersionNumber="1.0" RequestResponse="Request">
    <RequestFromSystem VersionNumber="1.0">
      <CorrelationID>
        ${externalCorrelationId}
      </CorrelationID>
      <SystemID literalvalue="String">
          B00LIBRA
      </SystemID>
      <OrganizationalUnitID literalvalue="String">
          0000000
      </OrganizationalUnitID>
      <DataController literalvalue="String">
          lee.flaxington
      </DataController>
      <User literalvalue="String">
          lee.flaxington
      </User>
      <SourceID literalvalue="String">
          B00LIBRA
      </SourceID>
      <DestinationID literalvalue="String">
          Z00CJSE
      </DestinationID>
      <TestOperation>
          true
      </TestOperation>
    </RequestFromSystem>
    <DataStream VersionNumber="1.0">
      <System literalvalue="String">
          B00LIBRA
      </System>
      <DataStreamType literalvalue="String">
          SPIResults
      </DataStreamType>
      <SystemDataStreamID>
          29_09_2021_105710_000000350512
      </SystemDataStreamID>
      <Name>
          SPI Results DISARR NEWREM
      </Name>
      <Reference>
          29_09_2021_105710_000000350512
      </Reference>
      <ReferenceType>
          SPIResults
      </ReferenceType>
      <Dated>
          2013-12-01
      </Dated>
      <Timed>
          10:57:17.043Z
      </Timed>
      <ContentType>
          text/plain
      </ContentType>
      <DataStreamContent>
          ${resultedCaseMessage}
      </DataStreamContent>
    </DataStream>
    <Routes VersionNumber="1.0">
        <Route VersionNumber="1.0">
            <RouteID>
              001
            </RouteID>
            <RouteSourceSystem literalvalue="String">
              B00LIBRA
            </RouteSourceSystem>
            <RouteDestinationSystem literalvalue="String">
              00101PoliceCaseSystem
            </RouteDestinationSystem>
            <Descriptor>
              String
            </Descriptor>
        </Route>
    </Routes>
  </RouteData>`;

  return result;
};

module.exports = convertMessageToNewFormat;

import branch from 'react-native-branch';

export const GenerateDeepLink = async (
  title,
  description,
  screen,
  payload,
  feature,
  link,
) => {
  try {
    let branchUniversalObject = await branch.createBranchUniversalObject(
      'canonicalIdentifier',
      {
        locallyIndex: true,
        title: title,
        contentDescription: description,
        contentMetadata: {
          ratingAverage: 4.2,
          customMetadata: {
            screen: screen,
            payload: JSON.stringify(payload),
          },
        },
      },
    );

    let linkProperties = {
      feature: feature,
      channel: 'tannoi',
    };

    let controlParams = {
      $desktop_url: 'https://www.tannoi.app/',
    };

    let {url} = await branchUniversalObject.generateShortUrl(
      linkProperties,
      controlParams,
    );

    link(url);
  } catch (error) {
    console.log(error);
  }
};

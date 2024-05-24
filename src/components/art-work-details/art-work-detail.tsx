import React, { FC } from 'react';
import { Image, Text, View, useWindowDimensions, ScrollView } from 'react-native';
import { Data } from '../../interfaces/response-data';
import { formatValue, removeHtmlTags } from '../../helpers/helpers';
import { GoBackButton } from '../ui/go-back-button';
import { styles } from './art-work-detail.styles';

interface ArtWorkDetailHeaderProps {
  artWork: Data;
}

export const ArtWorkDetail: FC<ArtWorkDetailHeaderProps> = ({ artWork }) => {
  const { height: screenHeight } = useWindowDimensions();

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ ...styles.imageContainer, height: screenHeight * 0.7 }}>
          <View style={styles.imageBorder}>
            <Image
              source={{
                uri: artWork.image_id
                  ? `https://www.artic.edu/iiif/2/${artWork.image_id}/full/843,/0/default.jpg`
                  : 'https://via.placeholder.com/843x475.png?text=No+Image',
              }}
              style={styles.posterImage}
            />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.subTitle}>{formatValue(artWork.artist_title)}</Text>
          <Text style={styles.title}>{formatValue(artWork.title)}</Text>
          <Text style={styles.descriptionTitle}>{'Description: '}</Text>
          <Text style={styles.description}>{removeHtmlTags(formatValue(artWork.description))}</Text>
          <Text style={styles.provenanceTitle}>{'Provenance: '}</Text>
          <Text style={styles.provenanceText}>{formatValue(artWork.provenance_text)}</Text>
          <Text style={styles.artistDisplayTitle}>{'Artist Display: '}</Text>
          <Text style={styles.artistDisplayText}>{formatValue(artWork.artist_display)}</Text>
        </View>
      </View>
      <GoBackButton />
    </ScrollView>
  );
};

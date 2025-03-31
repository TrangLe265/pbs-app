import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//source: https://medium.com/@mohantaankit2002/when-your-react-native-app-goes-blank-taming-the-white-screen-of-death-5baccfb055b2
//quick fix
class ErrorBoundary extends React.Component {
  state: { hasError: boolean; error: Error | null } = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to your analytics or crash reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>Something went wrong</Text>
          <Text style={styles.errorText}>
            {this.state.error?.toString()}
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default ErrorBoundary;




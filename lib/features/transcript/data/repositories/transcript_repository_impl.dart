import 'package:progres/core/network/api_client.dart';
import 'package:progres/features/transcript/data/models/academic_transcript.dart';
import 'package:progres/features/transcript/data/models/annual_transcript_summary.dart';
import 'package:progres/features/enrollment/data/models/enrollment.dart';

class TranscriptRepositoryImpl {
  final ApiClient _apiClient;

  TranscriptRepositoryImpl({ApiClient? apiClient})
    : _apiClient = apiClient ?? ApiClient();

  Future<List<Enrollment>> getStudentEnrollments() async {
    try {
      final uuid = await _apiClient.getUuid();
      if (uuid == null) {
        throw Exception('UUID not found, please login again');
      }

      final response = await _apiClient.get('/infos/bac/$uuid/dias');

      final List<dynamic> enrollmentsJson = response.data;
      return enrollmentsJson
          .map((enrollmentJson) => Enrollment.fromJson(enrollmentJson))
          .toList();
    } catch (e) {
      rethrow;
    }
  }

  Future<List<AcademicTranscript>> getAcademicTranscripts(
    int enrollmentId,
  ) async {
    try {
      final uuid = await _apiClient.getUuid();
      if (uuid == null) {
        throw Exception('UUID not found, please login again');
      }

      final response = await _apiClient.get(
        '/infos/bac/$uuid/dias/$enrollmentId/periode/bilans',
      );

      final List<dynamic> transcriptsJson = response.data;
      return transcriptsJson
          .map((transcriptJson) => AcademicTranscript.fromJson(transcriptJson))
          .toList();
    } catch (e) {
      rethrow;
    }
  }

  Future<AnnualTranscriptSummary> getAnnualTranscriptSummary(
    int enrollmentId,
  ) async {
    try {
      final uuid = await _apiClient.getUuid();
      if (uuid == null) {
        throw Exception('UUID not found, please login again');
      }

      final response = await _apiClient.get(
        '/infos/bac/$uuid/dia/$enrollmentId/annuel/bilan',
      );

      // The API returns an array with a single item
      final List<dynamic> summaryJson = response.data;
      if (summaryJson.isEmpty) {
        throw Exception('No annual summary found');
      }

      return AnnualTranscriptSummary.fromJson(summaryJson.first);
    } catch (e) {
      rethrow;
    }
  }
}

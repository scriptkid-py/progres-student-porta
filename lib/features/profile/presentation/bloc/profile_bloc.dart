import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:progres/features/auth/data/repositories/auth_repository_impl.dart';
import 'package:progres/features/enrollment/data/models/enrollment.dart';
import 'package:progres/features/profile/data/models/academic_period.dart';
import 'package:progres/features/profile/data/models/academic_year.dart';
import 'package:progres/features/profile/data/models/student_basic_info.dart';
import 'package:progres/features/profile/data/models/student_detailed_info.dart';
import 'package:progres/features/profile/data/repositories/student_repository_impl.dart';
import 'package:progres/features/profile/data/services/profile_cache_service.dart';

// Events
abstract class ProfileEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

class LoadProfileEvent extends ProfileEvent {}

class ClearProfileCacheEvent extends ProfileEvent {}

// States
abstract class ProfileState extends Equatable {
  @override
  List<Object?> get props => [];
}

class ProfileInitial extends ProfileState {}

class ProfileLoading extends ProfileState {}

class ProfileLoaded extends ProfileState {
  final StudentBasicInfo basicInfo;
  final AcademicYear academicYear;
  final StudentDetailedInfo detailedInfo;
  final List<AcademicPeriod> academicPeriods;
  final String? profileImage;
  final String? institutionLogo;

  ProfileLoaded({
    required this.basicInfo,
    required this.academicYear,
    required this.detailedInfo,
    required this.academicPeriods,
    this.profileImage,
    this.institutionLogo,
  });

  ProfileLoaded copyWith({
    StudentBasicInfo? basicInfo,
    AcademicYear? academicYear,
    StudentDetailedInfo? detailedInfo,
    List<AcademicPeriod>? academicPeriods,
    String? profileImage,
    String? institutionLogo,
    List<Enrollment>? enrollments,
  }) {
    return ProfileLoaded(
      basicInfo: basicInfo ?? this.basicInfo,
      academicYear: academicYear ?? this.academicYear,
      detailedInfo: detailedInfo ?? this.detailedInfo,
      academicPeriods: academicPeriods ?? this.academicPeriods,
      profileImage: profileImage ?? this.profileImage,
      institutionLogo: institutionLogo ?? this.institutionLogo,
    );
  }

  @override
  List<Object?> get props => [
    basicInfo,
    academicYear,
    detailedInfo,
    academicPeriods,
    profileImage,
    institutionLogo,
  ];
}

class ProfileError extends ProfileState {
  final String message;

  ProfileError(this.message);

  @override
  List<Object?> get props => [message];
}

// BLoC

class ProfileBloc extends Bloc<ProfileEvent, ProfileState> {
  final StudentRepositoryImpl studentRepository;
  final AuthRepositoryImpl authRepository;
  final ProfileCacheService cacheService;

  ProfileBloc({
    required this.studentRepository,
    required this.authRepository,
    required this.cacheService,
  }) : super(ProfileInitial()) {
    on<LoadProfileEvent>(_onLoadProfile);
    // on<LoadEnrollmentsEvent>(_onLoadEnrollments);
    on<ClearProfileCacheEvent>((event, emit) async {
      await cacheService.clearCache();
    });
  }

  Future<void> _onLoadProfile(
    LoadProfileEvent event,
    Emitter<ProfileState> emit,
  ) async {
    try {
      // Try to load cached profile first
      final cachedProfileData = await cacheService.getCachedProfileData();
      if (cachedProfileData != null) {
        // Create dummy models from cached data or adapt as needed
        // Here we do simple null checks and assign cached JSON to minimal model fields for demo
        // Adjust according to your real model constructors for proper deserialization
        final basicInfo = StudentBasicInfo.fromJson(
          cachedProfileData['basicInfo'],
        );
        final academicYear = AcademicYear.fromJson(
          cachedProfileData['academicYear'],
        );
        final detailedInfo = StudentDetailedInfo.fromJson(
          cachedProfileData['detailedInfo'],
        );
        final academicPeriodsJson = cachedProfileData['academicPeriods'] ?? [];
        final academicPeriods =
            academicPeriodsJson
                .map<AcademicPeriod>((item) => AcademicPeriod.fromJson(item))
                .toList();
        final profileImage = cachedProfileData['profileImage'] as String?;
        final institutionLogo = cachedProfileData['institutionLogo'] as String?;

        emit(
          ProfileLoaded(
            basicInfo: basicInfo,
            academicYear: academicYear,
            detailedInfo: detailedInfo,
            academicPeriods: academicPeriods,
            profileImage: profileImage,
            institutionLogo: institutionLogo,
          ),
        );
      }

      emit(ProfileLoading());

      // Fetch current academic year
      final academicYear = await studentRepository.getCurrentAcademicYear();

      // Fetch basic info
      final basicInfo = await studentRepository.getStudentBasicInfo();

      // Fetch detailed info
      final detailedInfo = await studentRepository.getStudentDetailedInfo(
        academicYear.id,
      );

      // Fetch academic periods
      final academicPeriods = await studentRepository.getAcademicPeriods(
        detailedInfo.niveauId,
      );

      // Optional data that we'll try to fetch but continue if unavailable
      String? profileImage;
      String? institutionLogo;

      try {
        profileImage = await studentRepository.getStudentProfileImage();
      } catch (e) {
        // Profile image not available, continue without it
      }

      try {
        // Get the etablissementId from auth repository
        final etablissementIdStr = await authRepository.getEtablissementId();
        if (etablissementIdStr != null) {
          final etablissementId = int.parse(etablissementIdStr);
          institutionLogo = await studentRepository.getInstitutionLogo(
            etablissementId,
          );
        }
      } catch (e) {
        // Institution logo not available, continue without it
      }

      // Cache latest profile data
      await cacheService.cacheProfileData({
        'basicInfo': basicInfo.toJson(),
        'academicYear': academicYear.toJson(),
        'detailedInfo': detailedInfo.toJson(),
        'academicPeriods': academicPeriods.map((e) => e.toJson()).toList(),
        'profileImage': profileImage,
        'institutionLogo': institutionLogo,
      });

      emit(
        ProfileLoaded(
          basicInfo: basicInfo,
          academicYear: academicYear,
          detailedInfo: detailedInfo,
          academicPeriods: academicPeriods,
          profileImage: profileImage,
          institutionLogo: institutionLogo,
        ),
      );
    } catch (e) {
      // On error, fallback to cache one last time
      final cachedProfileData = await cacheService.getCachedProfileData();
      if (cachedProfileData != null) {
        final basicInfo = StudentBasicInfo.fromJson(
          cachedProfileData['basicInfo'],
        );
        final academicYear = AcademicYear.fromJson(
          cachedProfileData['academicYear'],
        );
        final detailedInfo = StudentDetailedInfo.fromJson(
          cachedProfileData['detailedInfo'],
        );
        final academicPeriodsJson = cachedProfileData['academicPeriods'] ?? [];
        final academicPeriods =
            academicPeriodsJson
                .map<AcademicPeriod>((item) => AcademicPeriod.fromJson(item))
                .toList();
        final profileImage = cachedProfileData['profileImage'] as String?;
        final institutionLogo = cachedProfileData['institutionLogo'] as String?;

        emit(
          ProfileLoaded(
            basicInfo: basicInfo,
            academicYear: academicYear,
            detailedInfo: detailedInfo,
            academicPeriods: academicPeriods,
            profileImage: profileImage,
            institutionLogo: institutionLogo,
          ),
        );
      } else {
        emit(ProfileError(e.toString()));
      }
    }
  }
}
